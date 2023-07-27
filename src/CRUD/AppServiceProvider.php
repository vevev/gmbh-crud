<?php

namespace Simple\CRUD;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public $bindings = [
        \Simple\CRUD\Contracts\Repositories\UserRepositoryContract::class => \Simple\CRUD\Repositories\UserRepository::class,
        \Simple\CRUD\Contracts\Services\UserServiceContract::class => \Simple\CRUD\Services\UserService::class,
    ];
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
