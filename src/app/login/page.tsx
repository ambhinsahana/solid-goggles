import { login, signup } from './actions'
import { Button } from '@/components/ui/button'
import { WorldScene } from '@/components/game/world-scene'

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function LoginPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams
  const error = resolvedSearchParams.error as string | undefined
  const message = resolvedSearchParams.message as string | undefined

  return (
    <main className="relative min-h-screen bg-world-sky overflow-x-hidden pt-20 pb-16 flex items-center justify-center p-4">
      <WorldScene />

      <div className="w-full max-w-md p-8 bg-white border-4 border-[#E5D3B3] rounded-3xl relative z-10 shadow-[8px_8px_0_#E5D3B3]">
        <h1 className="text-4xl font-black text-center text-[#3D2C1E] mb-2 tracking-tight uppercase">ENTER THE NEXUS</h1>
        <p className="text-center text-[#8A7A6A] text-sm mb-8 font-medium">Begin your journey. Master your life.</p>

        {error && (
          <div className="mb-6 p-3 bg-red-100 border-2 border-red-400 text-red-700 text-sm font-bold text-center rounded-xl shadow-[0_2px_0_#F87171]">
            {message || "Authentication failed"}
          </div>
        )}

        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black tracking-widest text-[#8A7A6A] uppercase" htmlFor="email">Email</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              required 
              className="px-4 py-3 bg-[#FDF9F1] border-2 border-[#E5D3B3] rounded-xl focus:outline-none focus:border-[#D97757] focus:ring-2 focus:ring-[#D97757]/20 transition-all text-[#3D2C1E] placeholder-[#8A7A6A]/50 font-medium shadow-inner"
              placeholder="you@example.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black tracking-widest text-[#8A7A6A] uppercase" htmlFor="password">Password</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              required 
              className="px-4 py-3 bg-[#FDF9F1] border-2 border-[#E5D3B3] rounded-xl focus:outline-none focus:border-[#D97757] focus:ring-2 focus:ring-[#D97757]/20 transition-all text-[#3D2C1E] placeholder-[#8A7A6A]/50 font-medium shadow-inner"
              placeholder="••••••••"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black tracking-widest text-[#8A7A6A] uppercase" htmlFor="display_name">Display Name (Sign Up Only)</label>
            <input 
              id="display_name" 
              name="display_name" 
              type="text" 
              className="px-4 py-3 bg-[#FDF9F1] border-2 border-[#E5D3B3] rounded-xl focus:outline-none focus:border-[#D97757] focus:ring-2 focus:ring-[#D97757]/20 transition-all text-[#3D2C1E] placeholder-[#8A7A6A]/50 font-medium shadow-inner"
              placeholder="Your adventurer name"
            />
          </div>
          
          <div className="flex flex-col gap-4 mt-6">
            <Button 
              formAction={login} 
              className="w-full bg-[#D97757] hover:bg-[#C26243] text-white border-2 border-[#A34928] shadow-[0_4px_0_#A34928] active:translate-y-1 active:shadow-none transition-all font-black px-6 py-6 rounded-xl text-lg uppercase"
            >
              LOGIN
            </Button>
            <Button 
              formAction={signup} 
              variant="outline" 
              className="w-full bg-[#FDF9F1] hover:bg-[#E5D3B3] text-[#3D2C1E] border-2 border-[#E5D3B3] shadow-[0_4px_0_#E5D3B3] active:translate-y-1 active:shadow-none transition-all font-black px-6 py-6 rounded-xl text-lg uppercase"
            >
              SIGN UP
            </Button>
          </div>
        </form>
      </div>
    </main>
  )
}
