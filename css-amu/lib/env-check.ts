export type EnvVarStatus = {
  name: string;
  configured: boolean;
  public: boolean;
};

export function getEnvVarStatus(): EnvVarStatus[] {
  return [
    {
      name: "NEXT_PUBLIC_SUPABASE_URL",
      configured: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()),
      public: true,
    },
    {
      name: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
      configured: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()),
      public: true,
    },
    {
      name: "SUPABASE_SERVICE_ROLE_KEY",
      configured: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()),
      public: false,
    },
    {
      name: "ADMIN_PASSWORD",
      configured: Boolean(process.env.ADMIN_PASSWORD?.trim()),
      public: false,
    },
  ];
}

export function allRequiredEnvConfigured(): boolean {
  return getEnvVarStatus().every((v) => v.configured);
}
