using Microsoft.EntityFrameworkCore;
using API.Modelos;
using System.Diagnostics.CodeAnalysis;

namespace API.Data
{
    public class TenisContext: DbContext
    {
        protected readonly IConfiguration Configuration;
        public TenisContext(IConfiguration configuration){
            Configuration = configuration;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder options){
            options.UseSqlServer(Configuration.GetConnectionString("StringConexaoSQLServer"));
        }
        public DbSet<Tenis> Tenis {get; set;}
        public DbSet<User>? Usuario {get; set;}
    }
}