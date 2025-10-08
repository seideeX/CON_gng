<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CandidateController;
use App\Http\Controllers\TopFiveSelectionScoreController;
use App\Http\Controllers\ResultController\TopFiveSelectionResultController;
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


// Categories Routes
Route::middleware('auth')->group(function () {
    Route::get('/production_number', [CandidateController::class, 'production_number'])->name('production_number');
    Route::get('/casual_wear', [CandidateController::class, 'casual_wear'])->name('casual_wear');
    Route::get('/swim_wear', [CandidateController::class, 'swim_wear'])->name('swim_wear');
    Route::get('/formal_wear', [CandidateController::class, 'formal_wear'])->name('formal_wear');
});

// Scores Routes (Top 5 Selection)
Route::middleware('auth')->group(function () {
    Route::post('/production_number/scores', [TopFiveSelectionScoreController::class, 'production_number_store'])
        ->name('production_number.store');
    Route::post('/casual_wear/scores', [TopFiveSelectionScoreController::class, 'casual_wear_store'])
        ->name('casual_wear.store');
    Route::post('/swim_wear/scores', [TopFiveSelectionScoreController::class, 'swim_wear_store'])
        ->name('swim_wear.store');
    Route::post('/formal_wear/scores', [TopFiveSelectionScoreController::class, 'formal_wear_store'])
        ->name('formal_wear.store');
});
// Admin Results Routes (Top 5 Selection)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/admin/production_number', [TopFiveSelectionResultController::class, 'productionNumberResults'])
        ->name('admin.production_number');
    Route::get('/admin/casual_wear', [TopFiveSelectionResultController::class, 'casualWearResults'])
        ->name('admin.casual_wear');
    Route::get('/admin/swim_wear', [TopFiveSelectionResultController::class, 'swimWearResults'])
        ->name('admin.swim_wear');
    Route::get('/admin/formal_wear', [TopFiveSelectionResultController::class, 'formalWearResults'])
        ->name('admin.formal_wear');
    Route::get('/admin/closed_door_interview', [TopFiveSelectionResultController::class, 'closedDoorInterviewResults'])
        ->name('admin.closed_door_interview');
    Route::get('/admin/top_five_selection_result', [TopFiveSelectionResultController::class, 'topFiveSelectionResults'])
        ->name('admin.top_five_selection');
});



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
