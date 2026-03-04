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
            // Drop old columns
            $table->dropColumn(['production_number', 'casual_wear', 'swim_wear', 'formal_wear', 'closed_door_interview']);
            
            // Add new columns for Evening Gown
            $table->json('evening_gown')->nullable();
            $table->decimal('evening_gown_total', 8, 2)->default(0);
            
            // Add new columns for Production Number
            $table->json('production_number')->nullable();
            $table->decimal('production_number_total', 8, 2)->default(0);
            
            // Add new columns for Casual Wear
            $table->json('casual_wear')->nullable();
            $table->decimal('casual_wear_total', 8, 2)->default(0);
            
            // Add new columns for Swimsuit
            $table->json('swimsuit')->nullable();
            $table->decimal('swimsuit_total', 8, 2)->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('top_five_selection_scores', function (Blueprint $table) {
            // Drop new columns
            $table->dropColumn([
                'evening_gown', 'evening_gown_total',
                'production_number', 'production_number_total',
                'casual_wear', 'casual_wear_total',
                'swimsuit', 'swimsuit_total'
            ]);
            
            // Restore old columns
            $table->decimal('production_number', 8, 2)->nullable();
            $table->decimal('casual_wear', 8, 2)->nullable();
            $table->decimal('swim_wear', 8, 2)->nullable();
            $table->decimal('formal_wear', 8, 2)->nullable();
            $table->decimal('closed_door_interview', 8, 2)->nullable();
        });
    }
};
