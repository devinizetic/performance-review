import { Database } from './supabase';

export type Schema = Database['public'];
export type TablesName = keyof Database['public']['Tables'];
export type FunctionsName = keyof Database['public']['Functions'];
export type ViewsName = keyof Database['public']['Views'];

export type Rows<TName extends TablesName> =
  Database['public']['Tables'][TName]['Row'];
export type Inserts<TName extends TablesName> =
  Database['public']['Tables'][TName]['Insert'];
export type Updates<TName extends TablesName> =
  Database['public']['Tables'][TName]['Update'];
export type FunctionsArgs<FName extends FunctionsName> =
  Database['public']['Functions'][FName]['Args'];
export type FunctionsReturns<FName extends FunctionsName> =
  Database['public']['Functions'][FName]['Returns'];
export type Views<TName extends ViewsName> =
  Database['public']['Views'][TName]['Row'];
