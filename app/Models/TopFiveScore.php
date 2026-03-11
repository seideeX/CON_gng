<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TopFiveScore extends Model
{
    /** @use HasFactory<\Database\Factories\TopFiveScoreFactory> */
    use HasFactory;

    protected $fillable = [
        'top_five_id',
        'judge_id',
        'preliminary_round',
        'preliminary_round_total',
        'final_round',
        'final_round_total',
        'total_score',
    ];

    public function topFive()
    {
        return $this->belongsTo(TopFiveCandidates::class, 'top_five_id');
    }

    public function judge()
    {
        return $this->belongsTo(User::class, 'judge_id');
    }
}
