<?php

namespace App\Http\Controllers;

use App\Repositories\CandidateRepository;
use Inertia\Inertia;

class CandidateController extends Controller
{
    protected $candidates;

    public function __construct(CandidateRepository $candidates)
    {
        $this->candidates = $candidates;
    }
    protected function renderCategory(string $view)
    {
        $candidates = $this->candidates->all();

        return Inertia::render($view, [
            'candidates' => $candidates,
        ]);
    }

    public function production_number()
    {
        return $this->renderCategory('Categories/ProductionNumber');
    }

    public function casual_wear()
    {
        return $this->renderCategory('Categories/CasualWear');
    }

    public function swim_wear()
    {
        return $this->renderCategory('Categories/SwimWear');
    }

    public function formal_wear()
    {
        return $this->renderCategory('Categories/FormalWear');
    }
}
