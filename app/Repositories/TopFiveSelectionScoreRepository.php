<?php

namespace App\Repositories;

use App\Models\TopFiveSelectionScore;
use App\Models\TopFiveCandidates;
use App\Models\TopFiveScore;

class TopFiveSelectionScoreRepository
{
    public function updateOrCreateScore(int $judgeId, int $candidateId, string $category, array $subScores)
    {
        // Find existing record or create a new one
        $record = TopFiveSelectionScore::firstOrNew([
            'judge_id' => $judgeId,
            'candidate_id' => $candidateId,
        ]);

        // Store sub-criteria scores as JSON for the category
        $record->{$category} = json_encode($subScores);

        // Calculate category total from sub-criteria
        $categoryTotal = array_sum($subScores);
        $record->{$category . '_total'} = $categoryTotal;

        // Get preliminary score for this candidate (50% weight)
        $preliminaryScore = $this->getPreliminaryScore($judgeId, $candidateId);
        
        // Recalculate the grand total for all categories
        // Each category gets 50% from preliminary round + 50% from category score
        $eveningGownWeighted = ($record->evening_gown_total ?? 0) * 0.5 + $preliminaryScore * 0.5;
        $productionWeighted = ($record->production_number_total ?? 0) * 0.5 + $preliminaryScore * 0.5;
        $casualWearWeighted = ($record->casual_wear_total ?? 0) * 0.5 + $preliminaryScore * 0.5;
        $swimsuitWeighted = ($record->swimsuit_total ?? 0) * 0.5 + $preliminaryScore * 0.5;
        
        $record->total_scores = $eveningGownWeighted + $productionWeighted + $casualWearWeighted + $swimsuitWeighted;

        $record->save();

        return $record;
    }

    /**
     * Get preliminary round score for a candidate from a specific judge
     * Returns 0 if candidate is not in top 5 or has no preliminary score
     */
    private function getPreliminaryScore(int $judgeId, int $candidateId): float
    {
        // Check if candidate is in top 5
        $topFiveCandidate = TopFiveCandidates::where('candidate_id', $candidateId)->first();
        
        if (!$topFiveCandidate) {
            return 0;
        }

        // Get preliminary score for this judge and top_five_id
        $preliminaryScore = TopFiveScore::where('judge_id', $judgeId)
            ->where('top_five_id', $topFiveCandidate->id)
            ->first();

        return $preliminaryScore ? ($preliminaryScore->preliminary_round_total ?? 0) : 0;
    }
}