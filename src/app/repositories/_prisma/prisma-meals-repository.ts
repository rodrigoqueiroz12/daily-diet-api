import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { MealsRepository } from '../interfaces/meals-repository'

export class PrismaMealsRepository implements MealsRepository {
  async findById(id: string) {
    const meal = await prisma.meal.findUnique({
      where: {
        id,
      },
    })

    return meal
  }

  async getUserMeals(userId: string) {
    const meals = await prisma.meal.findMany({
      where: {
        userId,
      },
    })

    return meals
  }

  async getUserMetrics(userId: string) {
    const meals = await prisma.meal.findMany({
      where: {
        userId,
      },
      orderBy: {
        ateAt: 'asc',
      },
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

    const bestInDietMealsSequence = meals.reduce(
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

  async create({
    userId,
    name,
    description,
    ateAt,
    isInDiet,
  }: Prisma.MealUncheckedCreateInput) {
    const meal = await prisma.meal.create({
      data: {
        userId,
        name,
        description,
        ateAt,
        isInDiet,
      },
    })

    return meal
  }

  async update(id: string, data: Prisma.MealUpdateInput) {
    const meal = await prisma.meal.update({
      where: {
        id,
      },
      data: { ...data },
    })

    return meal
  }

  async delete(id: string) {
    const meal = await prisma.meal.delete({
      where: {
        id,
      },
    })

    return meal
  }
}
