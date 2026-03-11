<?php

namespace App\Services;

use App\Models\TopFiveSelectionScore;
use App\Models\Candidate;

class TopFiveSelectionService
{
    protected $categories = [
        'evening_gown',
        'production_number',
        'casual_wear',
        'swimsuit',
    ];

    protected $subCriteria = [
        'evening_gown' => [
            'elegance_poise' => 30,
            'stage_presence' => 25,
            'suitability_gown' => 20,
            'projection_expression' => 15,
            'overall_impact' => 10,
        ],
        'production_number' => [
            'energy_performance' => 30,
            'mastery_choreography' => 25,
            'stage_presence' => 20,
            'facial_expression' => 15,
            'overall_impact' => 10,
        ],
        'casual_wear' => [
            'style_fashion' => 30,
            'confidence_bearing' => 25,
            'suitability_coordination' => 20,
            'personality_projection' => 15,
            'overall_impression' => 10,
        ],
        'swimsuit' => [
            'body_proportion' => 30,
            'confidence_stage_presence' => 25,
            'walk_bearing' => 20,
            'poise_composure' => 15,
            'overall_appeal' => 10,
        ],
    ];

    public function getResultsPerCategory(string $category)
    {
        $judgeOrder = ['judge_1', 'judge_2', 'judge_3', 'judge_4', 'judge_5', 'judge_6', 'judge_7'];

        // Get all candidates
        $maleCandidatesList = Candidate::where('gender', 'male')->get();
        $femaleCandidatesList = Candidate::where('gender', 'female')->get();

        // Load all scores at once
        $scores = TopFiveSelectionScore::with('judge')->get();

        $maleCandidates = $this->processCandidates($maleCandidatesList, $scores, $category, $judgeOrder);
        $femaleCandidates = $this->processCandidates($femaleCandidatesList, $scores, $category, $judgeOrder);

        return [
            'maleCandidates' => $maleCandidates,
            'femaleCandidates' => $femaleCandidates,
            'judgeOrder' => $judgeOrder,
        ];
    }

    protected function processCandidates($candidatesList, $scores, $category, $judgeOrder)
    {
        $processed = [];
        $count = 0;

        foreach ($candidatesList as $candidate) {
            $count++;

            // Initialize all judges with 0
            $candidateScores = array_fill_keys($judgeOrder, 0);

            // Fill in scores if they exist (use the _total field)
            $candidateScoresFromDB = $scores->where('candidate_id', $candidate->id);
            foreach ($candidateScoresFromDB as $score) {
                if (in_array($score->judge->name, $judgeOrder)) {
                    // Use the category_total field which contains the sum of sub-criteria
                    $candidateScores[$score->judge->name] = $score->{$category . '_total'} ?? 0;
                }
            }

            $processed[] = [
                'candidate' => $candidate,
                'scores' => $candidateScores,
                'total' => round(array_sum($candidateScores), 2),
                'rank' => 0,
                'candidate_number' => $count,
            ];
        }

        return $this->assignRanking($processed);
    }

    public function getTopFiveSelectionResults()
    {
        // Get all candidates
        $maleCandidatesList = Candidate::where('gender', 'male')->get();
        $femaleCandidatesList = Candidate::where('gender', 'female')->get();

        // Load all scores at once
        $scores = TopFiveSelectionScore::with('judge')->get();

        $maleCandidates = $this->processTotalPerCategory($maleCandidatesList, $scores);
        $femaleCandidates = $this->processTotalPerCategory($femaleCandidatesList, $scores);

        return [
            'maleCandidates' => $maleCandidates,
            'femaleCandidates' => $femaleCandidates,
            'categories' => $this->categories,
        ];
    }

    protected function processTotalPerCategory($candidatesList, $scores)
    {
        $processed = [];
        $count = 0;

        foreach ($candidatesList as $candidate) {
            $count++;

            // Initialize all categories with 0
            $categoryTotals = array_fill_keys($this->categories, 0);

            // Sum all judges' scores per category (using _total fields)
            $candidateScores = $scores->where('candidate_id', $candidate->id);
            foreach ($candidateScores as $score) {
                foreach ($this->categories as $cat) {
                    // Use the category_total field which contains the sum of sub-criteria
                    $categoryTotals[$cat] += $score->{$cat . '_total'} ?? 0;
                }
            }

            $processed[] = [
                'candidate' => $candidate,
                'scores' => $categoryTotals,
                'total' => round(array_sum($categoryTotals), 2),
                'rank' => 0,
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
}
