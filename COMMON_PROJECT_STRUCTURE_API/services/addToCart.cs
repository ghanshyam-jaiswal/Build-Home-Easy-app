using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;


namespace COMMON_PROJECT_STRUCTURE_API.services
{
    public class addToCart
    {
        dbServices ds = new dbServices();

         public async Task<responseData> AddCart(requestData rData)
        {
            responseData resData = new responseData();
            try
            {
                var query = @"SELECT * FROM pc_student.repairStoreAddToCart WHERE id = @id AND productName=@productName";
                MySqlParameter[] myParam = new MySqlParameter[]
                {
                    new MySqlParameter("@id", rData.addInfo["id"]),
                    new MySqlParameter("@productName", rData.addInfo["productName"])
                };
                var dbData = ds.executeSQL(query, myParam);
                
                if (dbData[0].Count() > 0)
                {
                    resData.rData["rMessage"] = "Duplicate Credentials";
                }
                else
                {
                   var sq = @"INSERT INTO pc_student.repairStoreAddToCart
                    (id,productName, productImage, productPrice, brand, model, selectedProblem, otherProblem, uploadedImages, userName, contact) 
                    VALUES (@id, @productName, @productImage, @productPrice,  @brand, @model, @selectedProblem, @otherProblem, @uploadedImages, @userName, @contact )";

                    // if (!decimal.TryParse(rData.addInfo["productPrice"].ToString(), out decimal productPrice))
                    // {
                    //     resData.rData["rMessage"] = "Invalid product price";
                    //     return resData;
                    // }

                  MySqlParameter[] insertParams = new MySqlParameter[]
                    {
                        new MySqlParameter("@id", rData.addInfo["id"]),
                        // new MySqlParameter("@dateAndTime", rData.addInfo["dateAndTime"]),
                        new MySqlParameter("@productName", rData.addInfo["productName"]),
                        new MySqlParameter("@productImage", rData.addInfo["productImage"]),
                        new MySqlParameter("@productPrice", rData.addInfo["productPrice"]),
                        new MySqlParameter("@brand",  rData.addInfo["brand"]),
                        // new MySqlParameter("@model",  productPrice),
                        new MySqlParameter("@model", rData.addInfo["model"]),
                        new MySqlParameter("@selectedProblem", rData.addInfo["selectedProblem"]),
                        new MySqlParameter("@otherProblem", rData.addInfo["otherProblem"]),
                        new MySqlParameter("@uploadedImages", rData.addInfo["uploadedImages"]),
                        new MySqlParameter("@userName", rData.addInfo["userName"]),
                        new MySqlParameter("@contact", rData.addInfo["contact"]),
                    };
                    var insertResult = ds.executeSQL(sq, insertParams);

                    resData.rData["rMessage"] = "Added Successful";
                }
            }
            catch (Exception ex)
            {
                resData.rData["rMessage"] = "An error occurred: " + ex.Message;
            }
            return resData;
        }

        public async Task<responseData> GetAllCarts (requestData rData)
        {
            responseData resData = new responseData();
            try
            {
                var query = @"SELECT * FROM pc_student.repairStoreAddToCart ORDER BY table_id DESC";
                var dbData = ds.executeSQL(query, null);

                if (dbData == null)
                {
                    resData.rData["rMessage"] = "Database query returned null";
                    resData.rStatus = 1; // Indicate error
                    return resData;
                }

                List<object> usersList = new List<object>();

                foreach (var rowSet in dbData)
                {
                    if (rowSet != null)
                    {
                        foreach (var row in rowSet)
                        {
                            if (row != null)
                            {
                                List<string> rowData = new List<string>();

                                foreach (var column in row)
                                {
                                    if (column != null)
                                    {
                                        rowData.Add(column.ToString());
                                    }
                                }

                                var user = new
                                {
                                    table_id = rowData.ElementAtOrDefault(0),
                                    id = rowData.ElementAtOrDefault(1),
                                    dateAndTime = rowData.ElementAtOrDefault(2),
                                    productName = rowData.ElementAtOrDefault(3),
                                    productImage = rowData.ElementAtOrDefault(4),
                                    productPrice = rowData.ElementAtOrDefault(5),
                                    brand = rowData.ElementAtOrDefault(6),
                                    model = rowData.ElementAtOrDefault(7),
                                    selectedProblem = rowData.ElementAtOrDefault(8),
                                    otherProblem = rowData.ElementAtOrDefault(9),
                                    uploadedImages = rowData.ElementAtOrDefault(10),
                                    userName = rowData.ElementAtOrDefault(11),
                                    contact = rowData.ElementAtOrDefault(12),
                                };

                                usersList.Add(user);
                            }
                        }
                    }
                }

                resData.rData["users"] = usersList;
                resData.rData["rMessage"] = "Successful";
            }
            catch (Exception ex)
            {
                resData.rData["rMessage"] = "Exception occurred: " + ex.Message;
                resData.rStatus = 1; // Indicate error
            }

            return resData;
        }

        public async Task<responseData> GetAllAddedCartById(requestData rData)
        {
            responseData resData = new responseData();
            try
            {
                var query = @"SELECT * FROM pc_student.repairStoreAddToCart WHERE id=@id";

                MySqlParameter[] myParam = new MySqlParameter[]
                {
                    new MySqlParameter("@id", rData.addInfo["id"]) // Ensure rData contains the id field
                };

                var dbData = ds.executeSQL(query, myParam);

                if (dbData == null)
                {
                    resData.rData["rMessage"] = "Database query returned null";
                    resData.rStatus = 1; // Indicate error
                    return resData;
                }

                List<object> usersList = new List<object>();

                foreach (var rowSet in dbData)
                {
                    if (rowSet != null)
                    {
                        foreach (var row in rowSet)
                        {
                            if (row != null)
                            {
                                List<string> rowData = new List<string>();

                                foreach (var column in row)
                                {
                                    if (column != null)
                                    {
                                        rowData.Add(column.ToString());
                                    }
                                }

                                var user = new
                                {
                                    // table_id, id, dateAndTime, productName, productImage, productPrice, brand, model, selectedProblem, otherProblem, uploadedImages
                                    table_id = rowData.ElementAtOrDefault(0),
                                    id = rowData.ElementAtOrDefault(1),
                                    dateAndTime = rowData.ElementAtOrDefault(2),
                                    productName = rowData.ElementAtOrDefault(3),
                                    productImage = rowData.ElementAtOrDefault(4),
                                    productPrice = rowData.ElementAtOrDefault(5),
                                    brand = rowData.ElementAtOrDefault(6),
                                    model = rowData.ElementAtOrDefault(7),
                                    selectedProblem = rowData.ElementAtOrDefault(8),
                                    otherProblem = rowData.ElementAtOrDefault(9),
                                    uploadedImages = rowData.ElementAtOrDefault(10),
                                    userName = rowData.ElementAtOrDefault(11),
                                    contact = rowData.ElementAtOrDefault(12),
                                };

                                usersList.Add(user);
                            }
                        }
                    }
                }

                resData.rData["users"] = usersList;
                resData.rData["rMessage"] = "Successful";
                resData.rStatus = 0; // Indicate success
            }
            catch (Exception ex)
            {
                resData.rData["rMessage"] = "Exception occurred: " + ex.Message;
                resData.rStatus = 1; // Indicate error
            }

            return resData;
        }

        public async Task<responseData> DeleteCartById(requestData rData)
        {
            responseData resData = new responseData();

            try
            {
                // Your delete query
                var query = @"DELETE FROM pc_student.repairStoreAddToCart
                            WHERE table_id = @table_id;";

                // Your parameters
                MySqlParameter[] myParam = new MySqlParameter[]
                {
                    new MySqlParameter("@table_id", rData.addInfo["table_id"])
                };

                // Condition to execute the delete query
                bool shouldExecuteDelete = true;

                if (shouldExecuteDelete)
                {
                    int rowsAffected = ds.ExecuteUpdateSQL(query, myParam);

                    if (rowsAffected > 0)
                    {
                        resData.rData["rMessage"] = "DELETE SUCCESSFULLY.";
                    }
                    else
                    {
                        resData.rData["rMessage"] = "No rows affected. Delete failed.";
                    }
                }
                else
                {
                    resData.rData["rMessage"] = "Condition not met. Delete query not executed.";
                }
            }
            catch (Exception ex)
            {
                resData.rData["rMessage"] = "Exception occurred: " + ex.Message;
            }
            return resData;
        }


    }
}