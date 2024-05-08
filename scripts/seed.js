
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://aeihkyrmjiyefjnhqfjv.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


const {data, error} = await supabase.table('users').insert({"name": "Haver Ho"})

