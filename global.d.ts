// Файл для того что бы TSX не ругался на импорт .module.scss файлов в скриптах

declare module "*.module.scss" {
    const classes: { [key: string]: string };
    export default classes;
}
  