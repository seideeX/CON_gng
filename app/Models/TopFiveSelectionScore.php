<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TopFiveSelectionScore extends Model
{
    /** @use HasFactory<\Database\Factories\TopFiveSelectionScoreFactory> */
    use HasFactory;

    protected $fillable = [
        'candidate_id',
        'judge_id',
        'evening_gown',
        'evening_gown_total',
        'production_number',
        'production_number_total',
        'casual_wear',
        'casual_wear_total',
        'swimsuit',
        'swimsuit_total',
        'total_scores',
    ];

     public function candidate()
    {
        return $this->belongsTo(Candidate::class);
    }

    public function judge()
    {
        return $this->belongsTo(User::class, 'judge_id');
    }    
    
}