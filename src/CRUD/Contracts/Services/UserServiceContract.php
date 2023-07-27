<?php

namespace Simple\CRUD\Contracts\Services;

use Simple\CRUD\Models\User;

interface UserServiceContract
{

    public function show(string $id): User;

    public function showWithTrashed(string $id): User;
}
