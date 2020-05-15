let gulp = require("gulp");


gulp.task("default",async ()=>{
    gulp.watch("./*.html",async ()=>{
        gulp.src("./*.html")
        .pipe(gulp.dest("d:\\phpstudy\\www\\dianshang"));
    })

    
    gulp.watch("./js/*.js",async ()=>{
        gulp.src("./js/*.js",)
        .pipe(gulp.dest("d:\\phpstudy\\www\\dianshang\\js"));
    })
    
    gulp.watch("./*.php",async ()=>{
        gulp.src("./*.php")
        .pipe(gulp.dest("d:\\phpstudy\\www\\dianshang"));
    })
    gulp.watch("./css/*.css",async ()=>{
        gulp.src("./css/*.css")
        .pipe(gulp.dest("d:\\phpstudy\\www\\dianshang\\css"));
    })

    gulp.watch("./sms/**/*",async ()=>{
        gulp.src("./sms/**/*")
        .pipe(gulp.dest("D:\\phpStudy\\WWW\\dianshang\\sms"));
    });

    // json文件
    gulp.watch("./json/**/*",async ()=>{
        gulp.src("./json/**/*")
        .pipe(gulp.dest("D:\\phpStudy\\WWW\\dianshang\\json"));
    });
})
