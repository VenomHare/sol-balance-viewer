import { useState, type FormEvent } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { getBalanceData, type WalletBalance } from './lib/helper';
import { Card, CardContent, CardTitle } from './components/ui/card';

function App() {

  const [pub_id, setPub_id] = useState("");
  const [data, setData] = useState<WalletBalance>();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (pub_id == "" || pub_id.startsWith(" ")) {
      return;
    }
    const wallet_data = await getBalanceData(pub_id);
    setData(wallet_data);
  }

  return (
    <>
      <div className='w-dvw h-dvh bg-background p-2 flex flex-col items-center gap-2'>
        <Card className='p-5 w-full max-w-5xl'>
          <CardTitle>Get Wallet Balance</CardTitle>
          <CardContent>
            <form className='w-full flex flex-col sm:flex-row gap-2 ' onSubmit={handleSubmit}>
              <Input onChange={(e) => { setPub_id(e.target.value) }} value={pub_id} placeholder='Search Wallet Address' />
              <Button>Get Balance</Button>
            </form>
          </CardContent>
        </Card>
        {
          data &&
          <Card className='p-5 w-full max-w-5xl'>
            <CardTitle className='text-center'>Wallet Balance (SOL)</CardTitle>
            <CardContent>
              <div className='w-full h-full flex flex-col gap-2'>
                <div className='rounded border hover:shadow-foreground/10 duration-200 transition-all shadow-lg p-2 flex flex-col sm:flex-row gap-2 items-center justify-between'>
                  <p className='font-mono text-primary'>Wallet Id</p>
                  <p className='font-sans text-foreground p-1 border rounded bg-secondary text-sm sm:text-md overflow-x-auto max-w-full [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500'>{data.wallet_id}</p>
                </div>
                <div className='rounded border hover:shadow-foreground/10 duration-200 transition-all shadow-lg p-2 flex flex-col sm:flex-row gap-2 items-center justify-between'>
                  <p className='font-mono text-primary'>Solana</p>
                  <p className='font-sans text-foreground p-1 border rounded bg-secondary text-sm sm:text-md overflow-x-auto max-w-full [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500'>
                    {data.sol}
                  </p>
                </div>
                <div className='rounded border hover:shadow-foreground/10 duration-200 transition-all shadow-lg p-2 flex flex-col sm:flex-row gap-2 items-center justify-between'>
                  <p className='font-mono text-primary'>Lamports</p>
                  <p className='font-sans text-foreground p-1 border rounded bg-secondary text-sm sm:text-md overflow-x-auto max-w-full  [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500'>
                    {data.lamports}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        }
      </div>
    </>
  )
}

export default App
