import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing environment variables for Supabase configuration')
}

class CookieStorageAdapter {
  constructor(options = {}) {
    this.domain = options.domain || window.location.hostname;
    this.secure = options.secure || window.location.protocol === 'https:';
    this.path = options.path || '/';
    // Default to 12 hours if not specified
    this.expiryDays = options.expiryDays || 0.5;
  }

  setCookie(name, value, expiryDays = this.expiryDays) {
    const date = new Date();
    date.setTime(date.getTime() + (expiryDays * 24 * 60 * 60 * 1000));
    
    const cookie = [
      `${name}=${encodeURIComponent(value)}`,
      `expires=${date.toUTCString()}`,
      `path=${this.path}`,
      `domain=${this.domain}`
    ];
    
    if (this.secure) {
      cookie.push('secure');
    }
    
    document.cookie = cookie.join('; ');
  }

  getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return decodeURIComponent(parts.pop().split(';').shift());
    }
    return null;
  }

  removeCookie(name) {
    this.setCookie(name, '', -1);
  }

  // Required methods for Supabase storage adapter
  async getItem(key) {
    // Also check localStorage as fallback
    const value = this.getCookie(key) || localStorage.getItem(key);
    return value;
  }

  async setItem(key, value) {
    this.setCookie(key, value);
    // Also set in localStorage as fallback
    localStorage.setItem(key, value);
  }

  async removeItem(key) {
    this.removeCookie(key);
    localStorage.removeItem(key);
    console.log("localStorage after removeItem", localStorage);
  }
}
const storageAdapter = new CookieStorageAdapter({
  domain: 'vendraa-dashboard.vercel.app',
  secure: true,
  expiryDays: 1,
  path: '/',
});
const supabase = createClient(supabaseUrl, supabaseAnonKey,{
  auth:{
    storage:storageAdapter,
    storageKey:'noar.auth',
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
export const signUpWithEmail = async (email, password, metaData) => {
    const signupObj = {
      email,
      password,
      options: {
          data:metaData,
      }
  }
    console.log("signupObj", signupObj);
    const { data, error } = await supabase.auth.signUp(signupObj)

    
    if (error) throw error
    return data
}

export {supabase,loginWithEmail, signOut, getLoggedInUser}