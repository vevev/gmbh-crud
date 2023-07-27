<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public $bindings = [
        \Simple\CRUD\Contracts\Repositories\UserRepositoryContract::class => \Simple\CRUD\Repositories\UserRepository::class,
        \Simple\CRUD\Contracts\Services\UserServiceContract::class => \Simple\CRUD\Services\UserService::class,
        \Simple\CRUD\Contracts\Responses\UserResponseContract::class => \Simple\CRUD\Responses\UserResponse::class,
        \Simple\CRUD\Contracts\Responses\UsersResponseContract::class => \Simple\CRUD\Responses\UsersResponse::class,
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
