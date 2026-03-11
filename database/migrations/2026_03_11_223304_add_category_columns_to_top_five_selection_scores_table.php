<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('top_five_selection_scores', function (Blueprint $table) {
            // Add new columns for Evening Gown
            $table->json('evening_gown')->nullable()->after('judge_id');
            $table->decimal('evening_gown_total', 8, 2)->default(0)->after('evening_gown');
            
            // Add new columns for Production Number
            $table->json('production_number')->nullable()->after('evening_gown_total');
            $table->decimal('production_number_total', 8, 2)->default(0)->after('production_number');
            
            // Add new columns for Casual Wear
            $table->json('casual_wear')->nullable()->after('production_number_total');
            $table->decimal('casual_wear_total', 8, 2)->default(0)->after('casual_wear');
            
            // Add new columns for Swimsuit
            $table->json('swimsuit')->nullable()->after('casual_wear_total');
            $table->decimal('swimsuit_total', 8, 2)->default(0)->after('swimsuit');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('top_five_selection_scores', function (Blueprint $table) {
            $table->dropColumn([
                'evening_gown', 
                'evening_gown_total',
                'production_number', 
                'production_number_total',
                'casual_wear', 
                'casual_wear_total',
                'swimsuit', 
                'swimsuit_total'
            ]);
        });
    }
};
