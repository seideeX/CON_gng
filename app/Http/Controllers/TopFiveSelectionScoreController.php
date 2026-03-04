<?php

namespace App\Http\Controllers;

use App\Repositories\TopFiveSelectionScoreRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TopFiveSelectionScoreController extends Controller
{
    protected $scores;

    public function __construct(TopFiveSelectionScoreRepository $scores)
    {
        $this->scores = $scores;
    }

    private function storeScores(Request $request, string $category)
    {
        $request->validate([
            'judge_id' => 'required|exists:users,id',
            'scores' => 'required|array',
            'scores.*' => 'required|array', // Each candidate should have sub-criteria scores
        ]);

        $judgeId = $request->input('judge_id');
        $scores = $request->input('scores');

        foreach ($scores as $candidateId => $subScores) {
            $this->scores->updateOrCreateScore($judgeId, $candidateId, $category, $subScores);
        }

        return back();
    }

    public function evening_gown_store(Request $request)
    {
        return $this->storeScores($request, 'evening_gown');
    }

    public function production_number_store(Request $request)
    {
        return $this->storeScores($request, 'production_number');
    }

    public function casual_wear_store(Request $request)
    {
        return $this->storeScores($request, 'casual_wear');
    }

    public function swimsuit_store(Request $request)
    {
        return $this->storeScores($request, 'swimsuit');
    }
}
