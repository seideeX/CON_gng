<?php

namespace App\Http\Controllers;

use App\Repositories\TopFiveFinalistScoreRepository;
use App\Models\TopFiveCandidates;
use Illuminate\Http\Request;

class TopFiveScoreController extends Controller
{
    protected $scores;

    public function __construct(TopFiveFinalistScoreRepository $scores)
    {
        $this->scores = $scores;
    }

    /**
     * Generic function to store scores for a given category
     */
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
            $topFive = TopFiveCandidates::where('candidate_id', $candidateId)->first();

            if (!$topFive) {
                continue;
            }

            $topFiveId = $topFive->id;

            $this->scores->updateOrCreateScore($judgeId, $topFiveId, $category, $subScores);
        }

        return back();
    }

    /**
     * Store Preliminary Round scores
     */
    public function preliminaryRoundStore(Request $request)
    {
        return $this->storeScores($request, 'preliminary_round');
    }

    /**
     * Store Final Round scores
     */
    public function finalRoundStore(Request $request)
    {
        return $this->storeScores($request, 'final_round');
    }
}
