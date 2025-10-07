<?php

namespace App\Http\Controllers;

use App\Models\TopFiveSelectionScore;
use Illuminate\Http\Request;

class TopFiveSelectionScoreController extends Controller
{
    private function storeScores(Request $request, string $category)
    {
        $request->validate([
            'judge_id' => 'required|exists:users,id',
            'scores' => 'required|array',
        ]);

        $judgeId = $request->input('judge_id');
        $scores = $request->input('scores');

        foreach ($scores as $candidateId => $scoreValue) {
            // Update or create the record for this judge & candidate
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
        }

        return response()->json(['message' => ucfirst(str_replace('_', ' ', $category)) . ' scores saved successfully']);
    }

    public function production_number_store(Request $request)
    {
        return $this->storeScores($request, 'production_number');
    }

    public function casual_wear_store(Request $request)
    {
        return $this->storeScores($request, 'casual_wear');
    }

    public function swim_wear_store(Request $request)
    {
        return $this->storeScores($request, 'swim_wear');
    }

    public function formal_wear_store(Request $request)
    {
        return $this->storeScores($request, 'formal_wear');
    }
}
