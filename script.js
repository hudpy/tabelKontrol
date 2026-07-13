
const SUPABASE_URL="https://cfroorliulaijxvlsrce.supabase.co";

const SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcm9vcmxpdWxhaWp4dmxzcmNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI5MTI5NjgsImV4cCI6MjA5ODQ4ODk2OH0.Y7Uj03--vBVRj2IJdN7in5JcHpDtu5byItL2mt7dlUg";

const client=window.supabase.createClient
(
	SUPABASE_URL,
	SUPABASE_KEY
);

// tampil date

async function tampilData()
{
	const { data, error }=await client
		.from("kontrol")
		.select("*")
		.order("id");
	if (error)
	{
		console.log(error);
		return;
	}
	const hasil=document.getElementById("hasil");
	hasil.innerHTML="";
	data.forEach((ktl) => 
		{
			hasil.innerHTML += `
				<table class="tabel">
					<thead>
						<th>Id</th>
						<th>Tanggal</th>
						<th>Kelas</th>
						<th>Mapel</th>
						<th>Keterangan</th>
					</thead>
					<tbody>
						<tr>
							<td>${ktl.id}</td>
							<td>${ktl.tanggal}</td>
							<td>${ktl.kelas}</td>
							<td>${ktl.mata_pelajaran}</td>
							<td>${ktl.keterangan}</td>
						</tr>
					</tbody>
				</table>
			`;
		});
}

tampilData();


// tambah data

async function tambahData()
{
	const tanggal=document.getElementById("tanggal").value;
	const kelas=document.getElementById("kelas").value;
	const mata_pelajaran=document.getElementById("mata_pelajaran").value;
	const keterangan=document.getElementById("keterangan").value;
	const { error }=await client
		.from("kontrol")
		.insert([{
			tanggal:tanggal,
			kelas:kelas,
			mata_pelajaran:mata_pelajaran,
			keterangan:keterangan
		}]);
	if (error)
	{
		alert(error.message);
		return;
	}
	document.getElementById("tanggal").value="";
	document.getElementById("kelas").value="";
	document.getElementById("mata_pelajaran").value="";
	document.getElementById("keterangan").value="";

	tampilData();
}
