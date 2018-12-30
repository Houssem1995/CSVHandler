import csv
dict = {'ind_ahor_fin_ult1':'Saving Account','ind_aval_fin_ult1':'Guarantees','ind_cco_fin_ult1':'Current Accounts','ind_cder_fin_ult1':'Derivada Account','ind_cno_fin_ult1':'Payroll Account','ind_ctju_fin_ult1':'Junior Account','ind_ctma_fin_ult1':'Más particular Account','ind_ctop_fin_ult1':'particular Account','ind_ctpp_fin_ult1':'particular Plus Account','ind_deco_fin_ult1':'Short-term deposits','ind_deme_fin_ult1':'Medium-term deposits','ind_dela_fin_ult1':'Long-term deposits','ind_ecue_fin_ult1':'e-account','ind_fond_fin_ult1':'Funds','ind_hip_fin_ult1':'Mortgage','ind_plan_fin_ult1':'Pensions','ind_pres_fin_ult1':'Loans','ind_reca_fin_ult1':'Taxes','ind_tjcr_fin_ult1':'Credit Card','ind_valo_fin_ult1':'Securities','ind_viv_fin_ult1':'Home Account','ind_nomina_ult1':'Payroll','ind_nom_pens_ult1':'Pensions','ind_recibo_ult1':'Direct Debit'}
f = open('csvfile.csv','w')
f.write("ncodpers , added_products \n")
with open('combined_file.csv', 'w') as outcsv:
    writer = csv.DictWriter(outcsv, fieldnames = ["ncodpers", "added_products"])
    writer.writeheader()
    with open('LR_sub.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
                l=row["added_products"].split(" ")
                for i, p in enumerate(l) :
                    l[i] = dict[p]
                c=" ".join(l)
                row["added_products"]=c
                s= row["ncodpers"] + "," + row["added_products"]+"\n"
                writer.writerow({"ncodpers":row["ncodpers"],"added_products":row["added_products"]})
