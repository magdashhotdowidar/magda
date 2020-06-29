package com.all.Projectforall.configuration;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;


public class FileUpload {
    private static String ABS_path = "F:\\courses\\my generic project\\the demo\\FrontEnd\\treatement\\src\\assets\\images\\";
    private static String REAL_path = "";
    private static final Logger logger = LoggerFactory.getLogger(FileUpload.class);

    public static void UPloadImage(HttpServletRequest request, MultipartFile file, String name, String imageFor) {

        REAL_path = request.getSession().getServletContext().getRealPath("/assets/images/");
        logger.info("the real path" + REAL_path);
        logger.info("the abs path : " + ABS_path);

        if (imageFor == "product") {

            String PRODUCT_ABS_path = ABS_path + "products\\";
            String PRODUCT_REAL_path = REAL_path + "products\\";

            if (!new File(PRODUCT_ABS_path).exists()) new File(PRODUCT_ABS_path).mkdirs();
            if (!new File(PRODUCT_REAL_path).exists()) new File(PRODUCT_REAL_path).mkdirs();
            try {
                //project directory upload
                file.transferTo(new File(PRODUCT_ABS_path + name));

                //server upload
                file.transferTo(new File(PRODUCT_REAL_path + name));

            } catch (IOException ex) {
                logger.error(ex.getMessage());
            }

        } else if (imageFor == "user") {

            String USER_ABS_path = ABS_path + "users\\";
            String USER_REAL_path = REAL_path + "users\\";

            if (!new File(USER_ABS_path).exists()) new File(USER_ABS_path).mkdirs();
            if (!new File(USER_REAL_path).exists()) new File(USER_REAL_path).mkdirs();
            try {
                //project directory upload
                file.transferTo(new File(USER_ABS_path + name));

                //server upload
                file.transferTo(new File(USER_REAL_path + name));

            } catch (IOException ex) {
                logger.error(ex.getMessage());
            }

        }
    }
}
