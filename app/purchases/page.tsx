import { query, tableExists } from '@/lib/db'

export default async function Purchases() {
  let purchases = [];
  let error = null;

  try {
    const tableExist = await tableExists('purchases');
    if (tableExist) {
      purchases = await query('SELECT * FROM purchases LIMIT 10') as any[];
    } else {
      error = "Purchases table does not exist yet.";
    }
  } catch (err) {
    console.error('Error fetching purchases:', err);
    error = "An error occurred while fetching purchase data.";
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Inköp</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ul>
          {purchases.map((purchase: any) => (
            <li key={purchase.id}>Inköp #{purchase.id} - Datum: {purchase.date}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

