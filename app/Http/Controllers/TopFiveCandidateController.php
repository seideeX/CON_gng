<?php

namespace App\Http\Controllers;

use App\Models\TopFiveCandidates;
use App\Models\TopFiveScore;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TopFiveCandidateController extends Controller
{
    /**
     * Render Top Five candidates with existing scores for a specific category
     */
    protected function renderCategory(string $view, string $categoryField)
    {
        $judgeId = Auth::id();

        $candidates = TopFiveCandidates::with('candidate')
            ->get()
            ->sortBy(function ($item) {
                return $item->candidate->candidate_number ?? 0;
            })
            ->values()
            ->map(function ($item) use ($judgeId, $categoryField) {
                // Fetch score via top_five_id
                $score = TopFiveScore::where('top_five_id', $item->id)
                    ->where('judge_id', $judgeId)
                    ->first();

                return [
                    'id' => $item->id,
                    'candidate_number' => $item->candidate->candidate_number ?? null,
                    'candidate_id' => $item->candidate_id,
                    'profile_img' => $item->candidate->profile_img ?? null,
                    'first_name' => $item->candidate->first_name ?? null,
                    'last_name' => $item->candidate->last_name ?? null,
                    'course' => $item->candidate->course ?? null,
                    'gender' => $item->candidate->gender ?? null,
                    $categoryField => $score->{$categoryField . '_total'} ?? null,
                    'has_existing_score' => [
                        'preliminary_round' => $score->preliminary_round_total ?? null,
                        'final_round' => $score->final_round_total ?? null,
                    ],
                    'created_at' => $item->created_at,
                    'updated_at' => $item->updated_at,
                ];
            });

        return Inertia::render($view, [
            'candidates' => $candidates,
            'category' => $categoryField,
        ]);
    }


    public function preliminaryRound()
    {
        return $this->renderCategory('Categories/TopFiveFinalist/PreliminaryRound', 'preliminary_round');
    }

    public function finalRound()
    {
        return $this->renderCategory('Categories/TopFiveFinalist/FinalRound', 'final_round');
    }
}
