import { ElButton,ElTableColumn,ElTable} from 'element-plus';
export const useUI = function (app){
    [ElButton,ElTableColumn,ElTable].forEach((item) => {
        app.use(item)
    })
}