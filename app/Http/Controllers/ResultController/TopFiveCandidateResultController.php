<?php

namespace App\Http\Controllers\ResultController;

use App\Http\Controllers\Controller;
use App\Services\TopFiveService;
use Inertia\Inertia;

class TopFiveCandidateResultController extends Controller
{
    protected $service;

    public function __construct(TopFiveService $service)
    {
        $this->service = $service;
    }

    /**
     * Display results for Preliminary Round category
     */
    public function preliminaryRoundResults()
    {
        $results = $this->service->getResultsPerCategory('preliminary_round');

        return Inertia::render('Admin/TopFiveCategories/PreliminaryRoundResult', [
            'maleCandidates'   => $results['maleCandidates'],
            'femaleCandidates' => $results['femaleCandidates'],
            'judgeOrder'       => $results['judgeOrder'],
            'categoryName'     => 'Preliminary Round',
        ]);
    }

    /**
     * Display results for Final Round category
     */
    public function finalRoundResults()
    {
        $results = $this->service->getResultsPerCategory('final_round');

        return Inertia::render('Admin/TopFiveCategories/FinalRoundResult', [
            'maleCandidates'   => $results['maleCandidates'],
            'femaleCandidates' => $results['femaleCandidates'],
            'judgeOrder'       => $results['judgeOrder'],
            'categoryName'     => 'Final Round',
        ]);
    }

    public function totalResults()
    {
        $results = $this->service->getTotalResults();

        return Inertia::render('Admin/TopFiveCategories/TotalResults', [
            'maleCandidates'   => $results['maleCandidates'],
            'femaleCandidates' => $results['femaleCandidates'],
            'judgeOrder'       => $results['judgeOrder'],
            'categoryName'     => 'Total Combined Scores',
        ]);
    }
}
