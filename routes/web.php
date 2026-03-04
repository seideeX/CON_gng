<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CandidateController;
use App\Http\Controllers\ResultController\TopFiveSelectionResultController;
use App\Http\Controllers\ResultController\TopFiveCandidateResultController;
use App\Http\Controllers\TopFiveSelectionScoreController;
use App\Http\Controllers\TopFiveCandidateController;
use App\Http\Controllers\TopFiveScoreController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


// Categories Routes (Top 5 Selection)
Route::middleware('auth')->group(function () {
    Route::get('/evening_gown', [CandidateController::class, 'evening_gown'])->name('evening_gown');
    Route::get('/production_number', [CandidateController::class, 'production_number'])->name('production_number');
    Route::get('/casual_wear', [CandidateController::class, 'casual_wear'])->name('casual_wear');
    Route::get('/swimsuit', [CandidateController::class, 'swimsuit'])->name('swimsuit');
});

// Scores Routes (Top 5 Selection)
Route::middleware('auth')->group(function () {
    Route::post('/evening_gown/scores', [TopFiveSelectionScoreController::class, 'evening_gown_store'])
        ->name('evening_gown.store');
    Route::post('/production_number/scores', [TopFiveSelectionScoreController::class, 'production_number_store'])
        ->name('production_number.store');
    Route::post('/casual_wear/scores', [TopFiveSelectionScoreController::class, 'casual_wear_store'])
        ->name('casual_wear.store');
    Route::post('/swimsuit/scores', [TopFiveSelectionScoreController::class, 'swimsuit_store'])
        ->name('swimsuit.store');
});

// Admin Results Routes (Top 5 Selection)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/admin/evening_gown', [TopFiveSelectionResultController::class, 'eveningGownResults'])
        ->name('admin.evening_gown');
    Route::get('/admin/production_number', [TopFiveSelectionResultController::class, 'productionNumberResults'])
        ->name('admin.production_number');
    Route::get('/admin/casual_wear', [TopFiveSelectionResultController::class, 'casualWearResults'])
        ->name('admin.casual_wear');
    Route::get('/admin/swimsuit', [TopFiveSelectionResultController::class, 'swimsuitResults'])
        ->name('admin.swimsuit');
    Route::get('/admin/top_five_selection_result', [TopFiveSelectionResultController::class, 'topFiveSelectionResults'])
        ->name('admin.top_five_selection');
});

// Category Routes (Top 5 Finalists)
Route::middleware('auth')->group(function () {

    // Display Routes
    Route::get('/preliminary_round', [TopFiveCandidateController::class, 'preliminaryRound'])
        ->name('preliminary_round');
    Route::get('/final_round', [TopFiveCandidateController::class, 'finalRound'])
        ->name('final_round');

    // Store Routes
    Route::post('/preliminary_round/store', [TopFiveScoreController::class, 'preliminaryRoundStore'])
        ->name('preliminary_round.store');
    Route::post('/final_round/store', [TopFiveScoreController::class, 'finalRoundStore'])
        ->name('final_round.store');
});


// Admin Set Top 5 Candidates Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/top-five', [TopFiveSelectionResultController::class, 'setTopFive'])
        ->name('topFive.set');
});


//Admin Top 5 Candidates Result Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/admin/preliminary_round', [TopFiveCandidateResultController::class, 'preliminaryRoundResults'])
        ->name('admin.preliminary_round');
    Route::get('/admin/final_round', [TopFiveCandidateResultController::class, 'finalRoundResults'])
        ->name('admin.final_round');
    Route::get('/admin/total_results', [TopFiveCandidateResultController::class, 'totalResults'])
        ->name('admin.top_five_finalist');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
