using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using System;

namespace COMMON_PROJECT_STRUCTURE_API.services
{
    public class signup
    {
        dbServices ds = new dbServices();

        public async Task<responseData> Signup(requestData rData)
        {
            responseData resData = new responseData();
            try
            {
                var query = @"SELECT * FROM pc_student.RepaireStore WHERE email=@email";
                MySqlParameter[] myParam = new MySqlParameter[]
                {
                    new MySqlParameter("@email", rData.addInfo["email"])
                };
                var dbData = ds.executeSQL(query, myParam);
                
                if (dbData[0].Count() > 0)
                {
                    resData.rData["rMessage"] = "Duplicate Credentials";
                }
                else
                {
                   var sq = @"INSERT INTO pc_student.RepaireStore (first_name, last_name, email, password, contact, street_address1, street_address2, city, state, pincode, country,profile) 
                               VALUES (@FIRST_NAME, @LAST_NAME, @EMAIL, @PASSWORD, @CONTACT, @STREET_ADDRESS1, @STREET_ADDRESS2, @CITY, @STATE, @PINCODE, @COUNTRY,@PROFILE)";
                  MySqlParameter[] insertParams = new MySqlParameter[]
                    {
                        new MySqlParameter("@FIRST_NAME", rData.addInfo["first_name"]),
                        new MySqlParameter("@LAST_NAME", rData.addInfo["last_name"]),
                        new MySqlParameter("@EMAIL", rData.addInfo["email"]),
                        new MySqlParameter("@PASSWORD", rData.addInfo["password"]),
                        new MySqlParameter("@CONTACT", rData.addInfo["contact"]),
                        new MySqlParameter("@STREET_ADDRESS1", rData.addInfo["street_address1"]),
                        new MySqlParameter("@STREET_ADDRESS2", rData.addInfo["street_address2"]),
                        new MySqlParameter("@CITY", rData.addInfo["city"]),
                        new MySqlParameter("@STATE", rData.addInfo["state"]),
                        new MySqlParameter("@PINCODE", rData.addInfo["pincode"]),
                        new MySqlParameter("@COUNTRY", rData.addInfo["country"]),
                        new MySqlParameter("@PROFILE", rData.addInfo["profile"])
                    };
                    var insertResult = ds.executeSQL(sq, insertParams);

                    resData.rData["rMessage"] = "Signup Successful";
                }
            }
            catch (Exception ex)
            {
                resData.rData["rMessage"] = "An error occurred: " + ex.Message;
            }
            return resData;
        }


        public async Task<responseData> AdminSignup(requestData rData)
        {
            responseData resData = new responseData();
            try
            {
                var query = @"SELECT * FROM pc_student.RepairStoreAdmin WHERE email=@email";
                MySqlParameter[] myParam = new MySqlParameter[]
                {
                    new MySqlParameter("@email", rData.addInfo["email"])
                };
                var dbData = ds.executeSQL(query, myParam);
                
                if (dbData[0].Count() > 0)
                {
                    resData.rData["rMessage"] = "Duplicate Credentials";
                }
                else
                {
                   var sq = @"INSERT INTO pc_student.RepairStoreAdmin (firstName, lastName, email, password) 
                               VALUES (@firstName, @lastName, @email, @password)";
                    MySqlParameter[] insertParams = new MySqlParameter[]
                    {
                        new MySqlParameter("@firstName", rData.addInfo["firstName"]),
                        new MySqlParameter("@lastName", rData.addInfo["lastName"]),
                        new MySqlParameter("@email", rData.addInfo["email"]),
                        new MySqlParameter("@password", rData.addInfo["password"]),
                    };
                    var insertResult = ds.executeSQL(sq, insertParams);

                    resData.rData["rMessage"] = "Signup Successful";
                }
            }
            catch (Exception ex)
            {
                resData.rData["rMessage"] = "An error occurred: " + ex.Message;
            }
            return resData;
        }





    }
}
