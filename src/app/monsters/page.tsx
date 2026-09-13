import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Habit Monsters Arena — LifeQuest',
  description: 'Conquer real-life bad habits by battling colossal RPG bosses and claiming Mystery Box bounties.',
}

export default async function MonstersPage() {
  redirect('/dashboard?tab=monsters')
}
