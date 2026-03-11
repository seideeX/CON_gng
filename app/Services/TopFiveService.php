<?php

namespace App\Services;

use App\Models\TopFiveScore;
use App\Models\Candidate;
use App\Models\TopFiveCandidates;

class TopFiveService
{
    protected $categories = [
        'preliminary_round',
        'final_round',
    ];

    protected $subCriteria = [
        'preliminary_round' => [
            'beauty' => 30,
            'poise_composure' => 20,
            'wit' => 50,
        ],
        'final_round' => [
            'intelligence_depth' => 40,
            'communication_skills' => 25,
            'stage_presence_confidence' => 20,
            'overall_impact' => 15,
        ],
    ];

    /**
     * Get results per category for Top Five selection
     */
    public function getResultsPerCategory(string $category)
    {
        $judgeOrder = ['judge_1', 'judge_2', 'judge_3', 'judge_4', 'judge_5', 'judge_6', 'judge_7'];

        // Get only top 5 males and females
        $maleCandidatesList = TopFiveCandidates::with('candidate')
            ->whereHas('candidate', fn($q) => $q->where('gender', 'male'))
            ->get()
            ->map(fn($item) => ['candidate' => $item->candidate, 'top_five_id' => $item->id]);

        $femaleCandidatesList = TopFiveCandidates::with('candidate')
            ->whereHas('candidate', fn($q) => $q->where('gender', 'female'))
            ->get()
            ->map(fn($item) => ['candidate' => $item->candidate, 'top_five_id' => $item->id]);

        // Load all scores
        $scores = TopFiveScore::with('judge')->get();

        $maleCandidates   = $this->processCandidates($maleCandidatesList, $scores, $category, $judgeOrder);
        $femaleCandidates = $this->processCandidates($femaleCandidatesList, $scores, $category, $judgeOrder);

        return [
            'maleCandidates'   => $maleCandidates,
            'femaleCandidates' => $femaleCandidates,
            'judgeOrder'       => $judgeOrder,
        ];
    }

    protected function processCandidates($candidatesList, $scores, $category, $judgeOrder)
    {
        $processed = [];
        $count = 0;

        foreach ($candidatesList as $item) {
            $count++;
            $candidate = $item['candidate'];
            $topFiveId = $item['top_five_id'];

            // Initialize scores for each judge
            $candidateScores = array_fill_keys($judgeOrder, 0);

            // Fill in scores from DB using top_five_id (use the _total field)
            $candidateScoresFromDB = $scores->where('top_five_id', $topFiveId);
            foreach ($candidateScoresFromDB as $score) {
                if (in_array($score->judge->name, $judgeOrder)) {
                    // Use the category_total field which contains the sum of sub-criteria
                    $candidateScores[$score->judge->name] = $score->{$category . '_total'} ?? 0;
                }
            }

            $processed[] = [
                'candidate'        => $candidate,
                'scores'           => $candidateScores,
                'total'            => round(array_sum($candidateScores), 2),
                'rank'             => 0,
                'candidate_number' => $count,
            ];
        }

        return $this->assignRanking($processed);
    }

    protected function processTotalPerCategory($candidatesList, $scores)
    {
        $processed = [];
        $count = 0;

        foreach ($candidatesList as $item) {
            $count++;
            $candidate = $item['candidate'];
            $topFiveId = $item['top_five_id'];

            $categoryTotals = array_fill_keys($this->categories, 0);

            $candidateScores = $scores->where('top_five_id', $topFiveId);
            foreach ($candidateScores as $score) {
                foreach ($this->categories as $cat) {
                    // Use the category_total field which contains the sum of sub-criteria
                    $categoryTotals[$cat] += $score->{$cat . '_total'} ?? 0;
                }
            }

            $processed[] = [
                'candidate'        => $candidate,
                'scores'           => $categoryTotals,
                'total'            => round(array_sum($categoryTotals), 2),
                'rank'             => 0,
                'candidate_number' => $count,
            ];
        }

        return $this->assignRanking($processed);
    }

    private function assignRanking(array $candidates): array
    {
        usort($candidates, fn($a, $b) => $b['total'] <=> $a['total']);

        $rank = 1;
        $lastTotal = null;

        foreach ($candidates as $index => &$c) {
            if ($lastTotal !== null && $c['total'] === $lastTotal) {
                $c['rank'] = $rank;
            } else {
                $rank = $index + 1;
                $c['rank'] = $rank;
                $lastTotal = $c['total'];
            }
        }

        return $candidates;
    }

    public function getTotalResults()
    {
        $judgeOrder = ['judge_1', 'judge_2', 'judge_3', 'judge_4', 'judge_5', 'judge_6', 'judge_7'];

        $maleCandidatesList = TopFiveCandidates::with('candidate')
            ->whereHas('candidate', fn($q) => $q->where('gender', 'male'))
            ->get()
            ->map(fn($item) => ['candidate' => $item->candidate, 'top_five_id' => $item->id]);

        $femaleCandidatesList = TopFiveCandidates::with('candidate')
            ->whereHas('candidate', fn($q) => $q->where('gender', 'female'))
            ->get()
            ->map(fn($item) => ['candidate' => $item->candidate, 'top_five_id' => $item->id]);

        $scores = TopFiveScore::with('judge')->get();

        $maleCandidates   = $this->processTotalPerCategory($maleCandidatesList, $scores);
        $femaleCandidates = $this->processTotalPerCategory($femaleCandidatesList, $scores);

        return [
            'maleCandidates'   => $maleCandidates,
            'femaleCandidates' => $femaleCandidates,
            'judgeOrder'       => $judgeOrder,
        ];
    }
}
