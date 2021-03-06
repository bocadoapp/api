module.exports = id => `<?xml version="1.0" encoding="utf-8"?>
<foodquery>
    <type level="1"/>
    <selection>
        <atribute name="f_id"/>
        <atribute name="f_ori_name"/>
        <atribute name="f_eng_name"/>
    </selection>
    <condition>
        <cond1>
            <atribute1 name="foodgroup_id"/>
        </cond1>
        <relation type="EQUAL"/>
        <cond3>${id}</cond3>
    </condition>
    <condition>
        <cond1>
            <atribute1 name="f_origen"/>
        </cond1>
        <relation type="EQUAL"/>
        <cond3>BEDCA</cond3>
    </condition>
    <order ordtype="ASC">
        <atribute3 name="f_eng_name"/>
    </order>
</foodquery>`