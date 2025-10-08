<?php

namespace App\Repositories;

use App\Models\TopFiveSelectionScore;

class TopFiveSelectionScoreRepository
{
    public function updateOrCreateScore(int $judgeId, int $candidateId, string $category, $scoreValue)
    {
        $record = TopFiveSelectionScore::updateOrCreate(
            [
                'judge_id' => $judgeId,
                'candidate_id' => $candidateId,
            ],
            [
                $category => $scoreValue,
            ]
        );

        $record->total_scores =
            ($record->production_number ?? 0) +
            ($record->casual_wear ?? 0) +
            ($record->swim_wear ?? 0) +
            ($record->formal_wear ?? 0) +
            ($record->closed_door_interview ?? 0);

        $record->save();

        return $record;
    }
}
