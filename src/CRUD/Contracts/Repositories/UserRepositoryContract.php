<?php

namespace Simple\CRUD\Contracts\Repositories;

use Illuminate\Database\Eloquent\Model;

interface UserRepositoryContract
{
    public function update(array $data, mixed $id): bool;

    public function delete(string $id): bool;

    public function create(array $data): Model;

    public function find(string $id);
}
