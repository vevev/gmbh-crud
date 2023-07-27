<?php

namespace Simple\CRUD\Repositories;

use Illuminate\Database\Eloquent\Model;
use Simple\CRUD\Contracts\Repositories\UserRepositoryContract;
use Simple\CRUD\Models\User;

abstract class AbstractRepository implements UserRepositoryContract
{
    private Model $model;

    public function __construct()
    {
        $this->resolveModel();
    }

    protected function resolveModel(): static
    {
        $this->model = app($this->modelName());

        return $this;
    }

    /**
     * @return Model
     */
    protected function getModel(): Model
    {
        return $this->model;
    }

    abstract public function modelName(): string;



    /**
     * @param     string     $id
     *
     * @return mixed
     */
    public function find(string $id): User
    {
        return $this->getModel()->where('id', $id)->first();
    }

    /**
     * @param     string     $id
     *
     * @return mixed
     */
    public function findWithTrashed(string $id): User
    {
        return $this->getModel()->withTrashed()->where('id', $id)->first();
    }
}
