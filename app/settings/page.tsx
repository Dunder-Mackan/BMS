import { DatabaseTools } from '@/components/DatabaseTools'

export default function Settings() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-8">Inställningar</h1>
      
      <div className="grid gap-6">
        <section>
          <h2 className="text-xl font-semibold mb-4">Databashantering</h2>
          <DatabaseTools />
        </section>
        
        {/* Andra inställningar kan läggas till här */}
      </div>
    </div>
  )
}

