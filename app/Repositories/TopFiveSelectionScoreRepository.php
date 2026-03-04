<?php

namespace App\Repositories;

use App\Models\TopFiveSelectionScore;

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

        // Recalculate the grand total for all categories
        $record->total_scores =
            ($record->evening_gown_total ?? 0) +
            ($record->production_number_total ?? 0) +
            ($record->casual_wear_total ?? 0) +
            ($record->swimsuit_total ?? 0);

        $record->save();

        return $record;
    }
}