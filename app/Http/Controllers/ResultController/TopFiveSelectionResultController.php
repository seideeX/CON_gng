<?php

namespace App\Http\Controllers\ResultController;

use App\Http\Controllers\Controller;
use App\Models\TopFiveSelectionScore;
use Inertia\Inertia;

class TopFiveSelectionResultController extends Controller
{
    public function productionNumberResults()
    {
        $scores = TopFiveSelectionScore::with(['candidate', 'judge'])
            ->get(['id', 'candidate_id', 'judge_id', 'production_number']);

        $judgeOrder = ['judge_1', 'judge_2', 'judge_3', 'judge_4', 'judge_5'];

        $candidates = [];

        foreach ($scores as $score) {
            $candidateId = $score->candidate_id;
            if (!isset($candidates[$candidateId])) {
                $candidates[$candidateId] = [
                    'candidate' => $score->candidate,
                    'scores' => array_fill_keys($judgeOrder, 0),
                    'total' => 0,
                ];
            }

            $candidates[$candidateId]['scores'][$score->judge->name] = $score->production_number ?? 0;
        }

        // Calculate total per candidate
        foreach ($candidates as &$c) {
            $c['total'] = round(array_sum($c['scores']), 2);
        }

        return Inertia::render('Admin/ProductionNumberResult', [
            'candidates' => array_values($candidates),
            'judgeOrder' => $judgeOrder,
        ]);
    }
}
