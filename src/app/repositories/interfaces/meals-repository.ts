import { Meal, Prisma } from '@prisma/client'

export interface MealsRepository {
  findById(id: string): Promise<Meal | null>
  getUserMeals(userId: string): Promise<Meal[]>
  getUserMetrics(userId: string): Promise<{
    mealsQuantity: number
    inDietMealsQuantity: number
    outDietMealsQuantity: number
    bestInDietMealsSequence: number
  }>
  create(data: Prisma.MealUncheckedCreateInput): Promise<Meal>
  update(id: string, data: Prisma.MealUpdateInput): Promise<Meal>
  delete(id: string): Promise<Meal | null>
}
