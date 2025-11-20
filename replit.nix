{ pkgs }: {
  deps = [
    pkgs.nodejs_22
    pkgs.pnpm
  ];
  env = {
    PNPM_HOME = "${pkgs.pnpm}/bin";
  };
}