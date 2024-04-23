import { Meal, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'

import { MealsRepository } from '../interfaces/meals-repository'

export class InMemoryMealsRepository implements MealsRepository {
  private meals: Meal[] = []

  async findById(id: string) {
    const mealIndex = this.meals.findIndex((meal) => meal.id === id)

    if (mealIndex <= -1) {
      return null
    }

    const meal = this.meals[mealIndex]

    return meal
  }

  async getUserMeals(userId: string) {
    const meals = this.meals.filter((meal) => meal.userId === userId)

    return meals
  }

  async getUserMetrics(userId: string) {
    const meals = await this.getUserMeals(userId)

    const sortedMeals = meals.sort((a, b) => {
      const dataA = new Date(a.ateAt)
      const dataB = new Date(b.ateAt)

      if (dataA < dataB) return -1

      if (dataA > dataB) return 1

      return 0
    })

    const mealsQuantity = meals.length

    const { inDietMealsQuantity, outDietMealsQuantity } = meals.reduce(
      (acc, curr) => {
        return curr.isInDiet
          ? { ...acc, inDietMealsQuantity: acc.inDietMealsQuantity + 1 }
          : { ...acc, outDietMealsQuantity: acc.outDietMealsQuantity + 1 }
      },
      { inDietMealsQuantity: 0, outDietMealsQuantity: 0 },
    )
    const bestInDietMealsSequence = sortedMeals.reduce(
      (acc, curr) => {
        if (!curr.isInDiet) {
          return {
            sequence: Math.max(acc.sequence, acc.maxSequence),
            maxSequence: 0,
          }
        }

        return {
          sequence: Math.max(acc.sequence, acc.maxSequence + 1),
          maxSequence: acc.maxSequence + 1,
        }
      },
      { sequence: 0, maxSequence: 0 },
    ).sequence

    return {
      mealsQuantity,
      inDietMealsQuantity,
      outDietMealsQuantity,
      bestInDietMealsSequence,
    }
  }

  async create(data: Prisma.MealUncheckedCreateInput) {
    const meal: Meal = {
      id: randomUUID(),
      userId: data.userId,
      name: data.name,
      description: data.description,
      ateAt: new Date(data.ateAt),
      isInDiet: data.isInDiet,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.meals.push(meal)

    return meal
  }

  async update(
    id: string,
    { name, description, ateAt, isInDiet }: Prisma.MealUpdateInput,
  ) {
    const mealIndex = this.meals.findIndex(
      (meal) => meal.id.toString() === id.toString(),
    )

    const meal = this.meals[mealIndex]

    const updatedMeal: Meal = {
      id: meal.id,
      userId: meal.userId,
      name: name?.toString() || meal.name,
      description: description?.toString() || meal.description,
      ateAt: ateAt ? new Date(ateAt.toString()) : meal.ateAt,
      isInDiet: !!isInDiet || meal.isInDiet,
      createdAt: meal.createdAt,
      updatedAt: new Date(),
    }

    this.meals[mealIndex] = updatedMeal

    return updatedMeal
  }

  async delete(id: string) {
    const mealIndex = this.meals.findIndex(
      (meal) => meal.id.toString() === id.toString(),
    )

    if (mealIndex <= -1) {
      return null
    }

    const meal = this.meals[mealIndex]

    this.meals.splice(mealIndex, 1)

    return meal
  }
}
