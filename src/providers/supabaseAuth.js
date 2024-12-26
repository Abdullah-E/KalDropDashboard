import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing environment variables for Supabase configuration')
}
const supabase = createClient(supabaseUrl, supabaseAnonKey)

const loginWithEmail = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) {
    throw error
  }
  //print contents of local storage:
  console.log("localStorage after sign in", localStorage);
  return data.user;
}

const getLoggedInUser = async() => {
  const {data:{user}, error} = await supabase.auth.getUser();
  if (error) {
    console.error("error getting logged in user:", error);
    return null;
  }

  return user;
}

const signOut = async () => {
  const {error} = await supabase.auth.signOut();
  if (error) {
    console.error("error signing out:", error);
    throw error;
  }

}

export {supabase,loginWithEmail, signOut, getLoggedInUser}