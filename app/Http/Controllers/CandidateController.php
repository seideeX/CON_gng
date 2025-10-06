<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CandidateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function production_number()
    {
        // Fetch all candidates
        $candidates = Candidate::all();

        return Inertia::render('Categories/ProductionNumber', [
            'candidates' => $candidates,
        ]);
    }

    public function casual_wear()
    {
        // Fetch all candidates
        $candidates = Candidate::all();

        return Inertia::render('Categories/CasualWear', [
            'candidates' => $candidates,
        ]);
    }


}