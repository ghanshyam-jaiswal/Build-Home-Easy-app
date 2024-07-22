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
                var query = @"SELECT * FROM pc_student.BuildHomeEasyAddToCart WHERE userId = @userId AND itemName=@itemName";
                MySqlParameter[] myParam = new MySqlParameter[]
                {
                    new MySqlParameter("@userId", rData.addInfo["userId"]),
                    new MySqlParameter("@itemName", rData.addInfo["itemName"])
                };
                var dbData = ds.executeSQL(query, myParam);
                
                if (dbData[0].Count() > 0)
                {
                    resData.rData["rMessage"] = "Duplicate Credentials";
                }
                else
                {
                   var sq = @"INSERT INTO pc_student.BuildHomeEasyAddToCart
                    (userId, itemImage, itemName, pricePerItem, pricePerItem2, quantity, totalPrice) 
                    VALUES (@userId, @itemImage, @itemName,  @pricePerItem, @pricePerItem2, @quantity, @totalPrice)";

                    // if (!decimal.TryParse(rData.addInfo["productPrice"].ToString(), out decimal productPrice))
                    // {
                    //     resData.rData["rMessage"] = "Invalid product price";
                    //     return resData;
                    // }

                  MySqlParameter[] insertParams = new MySqlParameter[]
                    {
                        // new MySqlParameter("@id", rData.addInfo["id"]),
                        new MySqlParameter("@userId", rData.addInfo["userId"]),
                        new MySqlParameter("@itemImage", rData.addInfo["itemImage"]),
                        new MySqlParameter("@itemName", rData.addInfo["itemName"]),
                        new MySqlParameter("@pricePerItem",  rData.addInfo["pricePerItem"]),
                        new MySqlParameter("@pricePerItem2",  rData.addInfo["pricePerItem2"]),
                        new MySqlParameter("@quantity", rData.addInfo["quantity"]),
                        new MySqlParameter("@totalPrice", rData.addInfo["totalPrice"])
                        // new MySqlParameter("@dateAndTime", rData.addInfo["dateAndTime"]),
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
                var query = @"SELECT * FROM pc_student.BuildHomeEasyAddToCart ORDER BY id DESC";
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
                var query = @"SELECT * FROM pc_student.BuildHomeEasyAddToCart WHERE userId=@userId";

                MySqlParameter[] myParam = new MySqlParameter[]
                {
                    new MySqlParameter("@userId", rData.addInfo["userId"]) // Ensure rData contains the id field
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
                                    //id, userId, itemImage, itemName, pricePerItem, quantity, totalPrice, dateAndTime
                                    id = rowData.ElementAtOrDefault(0),
                                    userId = rowData.ElementAtOrDefault(1),
                                    itemImage = rowData.ElementAtOrDefault(2),
                                    itemName = rowData.ElementAtOrDefault(3),
                                    pricePerItem = rowData.ElementAtOrDefault(4),
                                    pricePerItem2 = rowData.ElementAtOrDefault(5),
                                    quantity = rowData.ElementAtOrDefault(6),
                                    totalPrice = rowData.ElementAtOrDefault(7),
                                    dateAndTime = rowData.ElementAtOrDefault(8),
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
                var query = @"DELETE FROM pc_student.BuildHomeEasyAddToCart
                            WHERE id = @id;";

                // Your parameters
                MySqlParameter[] myParam = new MySqlParameter[]
                {
                    new MySqlParameter("@id", rData.addInfo["id"])
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

         public async Task<responseData> UpdateCartById(requestData rData)
        {
            responseData resData = new responseData();

            try
            {
                // Your update query
                var query = @"UPDATE pc_student.BuildHomeEasyAddToCart 
                            SET quantity = @quantity, 
                                totalPrice = @totalPrice
                           WHERE id = @id;";

                // Your parameters
                MySqlParameter[] myParam = new MySqlParameter[]
                {

                    new MySqlParameter("@id", rData.addInfo["id"]),
                    new MySqlParameter("@quantity", rData.addInfo["quantity"]),
                    new MySqlParameter("@totalPrice", rData.addInfo["totalPrice"])
                };

                // Condition to execute the update query
                bool shouldExecuteUpdate = true;

                if (shouldExecuteUpdate)
                {
                    // int rowsAffected = ds.ExecuteUpdateSQL(query, myParam);
                    int rowsAffected = ds.ExecuteUpdateSQL(query, myParam);

                    if (rowsAffected > 0)
                    {
                        resData.rData["rMessage"] = "UPDATE SUCCESSFULLY.";
                    }
                    else
                    {
                        resData.rData["rMessage"] = "No rows affected. Update failed.";
                    }
                }
                else
                {
                    resData.rData["rMessage"] = "Condition not met. Update query not executed.";
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