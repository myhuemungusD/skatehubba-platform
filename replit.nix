{ pkgs }: {
  deps = [
    pkgs.nodejs_22
    pkgs.pnpm
    pkgs.nodePackages.pnpm
  ];
}