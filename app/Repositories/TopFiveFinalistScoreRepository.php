<?php

namespace App\Repositories;

use App\Models\TopFiveScore;

class TopFiveFinalistScoreRepository
{
    public function updateOrCreateScore(int $judgeId, int $topFiveId, string $category, array $subScores)
    {
        // Use top_five_id instead of candidate_id
        $record = TopFiveScore::firstOrNew([
            'judge_id' => $judgeId,
            'top_five_id' => $topFiveId,
        ]);

        // Store sub-criteria scores as JSON for the category
        $record->{$category} = json_encode($subScores);

        // Calculate category total from sub-criteria
        $categoryTotal = array_sum($subScores);
        $record->{$category . '_total'} = $categoryTotal;

        // Recalculate total score
        // Final round starts at zero (no preliminary weight)
        // Total is just the sum of both rounds without any weighting
        $record->total_score =
            ($record->preliminary_round_total ?? 0) +
            ($record->final_round_total ?? 0);

        $record->save();

        return $record;
    }
}
