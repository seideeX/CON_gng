<?php

namespace App\Http\Controllers\ResultController;

use App\Http\Controllers\Controller;
use App\Services\TopFiveSelectionService;
use Inertia\Inertia;

class TopFiveSelectionResultController extends Controller
{
    protected $service;

    public function __construct(TopFiveSelectionService $service)
    {
        $this->service = $service;
    }

    public function productionNumberResults()
    {
        $results = $this->service->getResultsPerCategory('production_number');

        return Inertia::render('Admin/ProductionNumberResult', [
            'maleCandidates' => $results['maleCandidates'],
            'femaleCandidates' => $results['femaleCandidates'],
            'judgeOrder' => $results['judgeOrder'],
            'categoryName' => 'Production Number',
        ]);
    }

    public function casualWearResults()
    {
        $results = $this->service->getResultsPerCategory('casual_wear');

        return Inertia::render('Admin/CasualWearResult', [
            'maleCandidates' => $results['maleCandidates'],
            'femaleCandidates' => $results['femaleCandidates'],
            'judgeOrder' => $results['judgeOrder'],
            'categoryName' => 'Casual Wear',
        ]);
    }

    public function swimWearResults()
    {
        $results = $this->service->getResultsPerCategory('swim_wear');

        return Inertia::render('Admin/SwimWearResult', [
            'maleCandidates' => $results['maleCandidates'],
            'femaleCandidates' => $results['femaleCandidates'],
            'judgeOrder' => $results['judgeOrder'],
            'categoryName' => 'Swim Wear',
        ]);
    }

    public function formalWearResults()
    {
        $results = $this->service->getResultsPerCategory('formal_wear');

        return Inertia::render('Admin/FormalWearResult', [
            'maleCandidates' => $results['maleCandidates'],
            'femaleCandidates' => $results['femaleCandidates'],
            'judgeOrder' => $results['judgeOrder'],
            'categoryName' => 'Formal Wear',
        ]);
    }
    public function closedDoorInterviewResults()
    {
        $results = $this->service->getResultsPerCategory('closed_door_interview');

        return Inertia::render('Admin/ClosedDoorInterviewResult', [
            'maleCandidates' => $results['maleCandidates'],
            'femaleCandidates' => $results['femaleCandidates'],
            'judgeOrder' => $results['judgeOrder'],
            'categoryName' => 'Closed Door Interview',
        ]);
    }
    public function topFiveSelectionResults()
    {
        $results = $this->service->getTopFiveSelectionResults();

        return Inertia::render('Admin/TopFiveSelectionResult', [
            'maleCandidates' => $results['maleCandidates'],
            'femaleCandidates' => $results['femaleCandidates'],
            'categories' => $results['categories'],
            'categoryName' => 'Top Five Selection',
        ]);
    }
}