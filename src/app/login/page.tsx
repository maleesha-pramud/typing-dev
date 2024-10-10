"use client"
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { login } from "@/lib/services/submit_action";


const page = () => {
  const { toast } = useToast();

  const handleSubmit = async (formData: FormData) => {
    const response = await login(formData);
    console.log('response', response)
    toast({
      title: "Scheduled: Catch up",
      description: "Friday, February 10, 2023 at 5:57 PM",
    });
  }


  return (
    <div>
      <h1>Login with Email</h1>
      <form action={handleSubmit}>
        <input type="text" name="name" />
        <button type="submit">Submit</button>
      </form>

      <Toaster />
    </div>
  )
}

export default page