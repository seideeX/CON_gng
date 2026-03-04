<?php

namespace App\Http\Controllers\ResultController;

use App\Http\Controllers\Controller;
use App\Services\TopFiveSelectionService;
use App\Models\TopFiveCandidates;
use Inertia\Inertia;
use Illuminate\Http\Request;

class TopFiveSelectionResultController extends Controller
{
    protected $service;

    public function __construct(TopFiveSelectionService $service)
    {
        $this->service = $service;
    }

    public function eveningGownResults()
    {
        $results = $this->service->getResultsPerCategory('evening_gown');

        return Inertia::render('Admin/EveningGownResult', [
            'maleCandidates' => $results['maleCandidates'],
            'femaleCandidates' => $results['femaleCandidates'],
            'judgeOrder' => $results['judgeOrder'],
            'categoryName' => 'Evening Gown',
        ]);
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

    public function swimsuitResults()
    {
        $results = $this->service->getResultsPerCategory('swimsuit');

        return Inertia::render('Admin/SwimsuitResult', [
            'maleCandidates' => $results['maleCandidates'],
            'femaleCandidates' => $results['femaleCandidates'],
            'judgeOrder' => $results['judgeOrder'],
            'categoryName' => 'Swimsuit',
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

    public function setTopFive(Request $request)
    {
        $request->validate([
            'candidate_ids' => 'required|array|min:1',
            'candidate_ids.*' => 'exists:candidates,id',
        ]);

        TopFiveCandidates::query()->delete();

        foreach ($request->candidate_ids as $candidateId) {
            TopFiveCandidates::create([
                'candidate_id' => $candidateId,
            ]);
        }

        return redirect()->back()->with('success', 'Top 5 Male & Female saved successfully!');
    }
}
