<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TopFiveScore extends Model
{
    /** @use HasFactory<\Database\Factories\TopFiveScoreFactory> */
    use HasFactory;

    protected $fillable = [
        'candidate_id',
        'judge_id',
        'face_and_figure',
        'delivery',
        'overall_appeal',
        'total_score',
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